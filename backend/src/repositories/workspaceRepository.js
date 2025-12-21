import { get } from 'mongoose';
import Workspace from '../schema/workspace.js';
import crudRepository from './crudRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { StatusCodes } from 'http-status-codes';
import User from '../schema/user.js';

const workspaceRepository = {
  ...crudRepository(Workspace),
  getWorkspaceByName: async function (workspaceName) {
    const workspace = await Workspace.findOne({
      name: workspaceName
    });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: `Workspace with name ${workspaceName} not found`,
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  getWorkspaceByJoinCode: async function (joinCode) {
    const workspace = await Workspace.findOne({
      joinCode
    });
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: 'Workspace with the provided join code not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return workspace;
  },
  addMemberToWorkspace: async function (workspaceId, memberId, role) {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: `Workspace with id ${workspaceId} not found`,
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const memberExists = workspace.members.find(
      (member) => member.memberId.toString() === memberId
    );
    if (memberExists) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: 'User is already a member of the workspace',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    workspace.members.push({ memberId, role });
    await workspace.save();
    return workspace;
  },
  addChannelToWorkspace: async function (workspaceId, channelId) {},
  fetchAllWorkspacesByMemberId: async function (memberId) {}
};

export default workspaceRepository;
