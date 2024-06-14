import { withQueryData } from '@testing/utils'

export const mockProjectsResponseWithData = withQueryData({
  projects: [
    {
      id: 'fa18c8dd-f6d8-4c1a-95c8-dcae4a0bd69f',
      name: 'Project 1',
      description: 'This is a description for Project 1',
      dueDate: null,
      categories: [
        {
          id: '4f3f7662-d63a-4608-9490-db27593424bd',
          name: 'Open',
          status: 'open',
          displayOrder: 0
        },
        {
          id: '9cb58444-b89d-420a-8a59-0ff3e293018c',
          name: 'In Progress',
          status: 'in-progress',
          displayOrder: 1
        },
        {
          id: '1fdddf46-23c7-4183-8ede-c7bb340d9c1f',
          name: 'In Review',
          status: 'in-review',
          displayOrder: 2
        },
        {
          id: '2b43dd7c-ab24-41b1-9836-f4e536ac4ca3',
          name: 'Complete',
          status: 'complete',
          displayOrder: 3
        }
      ],
      user: {
        id: 'e8eca0f6-8214-47b0-b35c-92d3587956f5',
        email: 'sfailla1983@gmail.com',
        username: 'sfailla'
      },
      createdAt: '2024-04-10T01:55:59.697Z',
      updatedAt: '2024-04-10T01:55:59.697Z'
    },
    {
      id: '3326b479-fea1-4b9c-a8dd-bd69a915de4a',
      name: 'Project 2',
      description: 'This is a description for project 2',
      dueDate: null,
      categories: [
        {
          id: '4f3f7662-d63a-4608-9490-db27593424bd',
          name: 'Open',
          status: 'open',
          displayOrder: 0
        },
        {
          id: '9cb58444-b89d-420a-8a59-0ff3e293018c',
          name: 'In Progress',
          status: 'in-progress',
          displayOrder: 1
        },
        {
          id: '1fdddf46-23c7-4183-8ede-c7bb340d9c1f',
          name: 'In Review',
          status: 'in-review',
          displayOrder: 2
        },
        {
          id: '2b43dd7c-ab24-41b1-9836-f4e536ac4ca3',
          name: 'Complete',
          status: 'complete',
          displayOrder: 3
        }
      ],
      user: {
        id: 'e8eca0f6-8214-47b0-b35c-92d3587956f5',
        email: 'sfailla1983@gmail.com',
        username: 'sfailla'
      },
      createdAt: '2024-04-13T15:44:21.823Z',
      updatedAt: '2024-04-13T15:44:21.823Z'
    },
    {
      id: '9ba0793d-b02e-4b56-8cc4-7921ad56c776',
      name: 'Project 3',
      description: 'This is a description for project 3',
      dueDate: null,
      categories: [
        {
          id: '4f3f7662-d63a-4608-9490-db27593424bd',
          name: 'Open',
          status: 'open',
          displayOrder: 0
        },
        {
          id: '9cb58444-b89d-420a-8a59-0ff3e293018c',
          name: 'In Progress',
          status: 'in-progress',
          displayOrder: 1
        },
        {
          id: '1fdddf46-23c7-4183-8ede-c7bb340d9c1f',
          name: 'In Review',
          status: 'in-review',
          displayOrder: 2
        },
        {
          id: '2b43dd7c-ab24-41b1-9836-f4e536ac4ca3',
          name: 'Complete',
          status: 'complete',
          displayOrder: 3
        }
      ],
      user: {
        id: 'e8eca0f6-8214-47b0-b35c-92d3587956f5',
        email: 'sfailla1983@gmail.com',
        username: 'sfailla'
      },
      createdAt: '2024-04-21T20:49:28.812Z',
      updatedAt: '2024-04-21T20:49:28.812Z'
    }
  ]
})

export const mockGetProjectByIdResponseWithData = withQueryData({
  project: {
    id: 'fa18c8dd-f6d8-4c1a-95c8-dcae4a0bd69f',
    name: 'Project 1',
    description: 'This is a description for Project 1',
    dueDate: null,
    categories: [
      {
        id: '4f3f7662-d63a-4608-9490-db27593424bd',
        name: 'Open',
        status: 'open',
        displayOrder: 0
      },
      {
        id: '9cb58444-b89d-420a-8a59-0ff3e293018c',
        name: 'In Progress',
        status: 'in-progress',
        displayOrder: 1
      },
      {
        id: '1fdddf46-23c7-4183-8ede-c7bb340d9c1f',
        name: 'In Review',
        status: 'in-review',
        displayOrder: 2
      },
      {
        id: '2b43dd7c-ab24-41b1-9836-f4e536ac4ca3',
        name: 'Complete',
        status: 'complete',
        displayOrder: 3
      }
    ],
    user: {
      id: 'e8eca0f6-8214-47b0-b35c-92d3587956f5',
      email: 'sfailla1983@gmail.com',
      username: 'sfailla'
    },
    createdAt: '2024-04-10T01:55:59.697Z',
    updatedAt: '2024-04-10T01:55:59.697Z'
  }
})

export const mockCreateProjectResponseWithData = withQueryData({
  createProject: {
    id: 'fa18c8dd-f6d8-4c1a-95c8-dcae4a0bd69f',
    name: 'Project 1',
    description: 'This is a description for Project 1',
    dueDate: null,
    categories: [
      {
        id: '4f3f7662-d63a-4608-9490-db27593424bd',
        name: 'Open',
        status: 'open',
        displayOrder: 0
      },
      {
        id: '9cb58444-b89d-420a-8a59-0ff3e293018c',
        name: 'In Progress',
        status: 'in-progress',
        displayOrder: 1
      },
      {
        id: '1fdddf46-23c7-4183-8ede-c7bb340d9c1f',
        name: 'In Review',
        status: 'in-review',
        displayOrder: 2
      },
      {
        id: '2b43dd7c-ab24-41b1-9836-f4e536ac4ca3',
        name: 'Complete',
        status: 'complete',
        displayOrder: 3
      }
    ],
    user: {
      id: 'e8eca0f6-8214-47b0-b35c-92d3587956f5',
      email: 'sfailla1983@gmail.com',
      username: 'sfailla'
    },
    createdAt: '2024-04-10T01:55:59.697Z',
    updatedAt: '2024-04-10T01:55:59.697Z'
  }
})

export const mockUpdateProjectResponseWithData = withQueryData({
  updateProject: {
    id: 'fa18c8dd-f6d8-4c1a-95c8-dcae4a0bd69f',
    name: 'Project 1',
    description: 'This is a description for Project 1',
    dueDate: null,
    categories: [
      {
        id: '4f3f7662-d63a-4608-9490-db27593424bd',
        name: 'Open',
        status: 'open',
        displayOrder: 0
      },
      {
        id: '9cb58444-b89d-420a-8a59-0ff3e293018c',
        name: 'In Progress',
        status: 'in-progress',
        displayOrder: 1
      },
      {
        id: '1fdddf46-23c7-4183-8ede-c7bb340d9c1f',
        name: 'In Review',
        status: 'in-review',
        displayOrder: 2
      },
      {
        id: '2b43dd7c-ab24-41b1-9836-f4e536ac4ca3',
        name: 'Complete',
        status: 'complete',
        displayOrder: 3
      }
    ],
    user: {
      id: 'e8eca0f6-8214-47b0-b35c-92d3587956f5',
      email: 'sfailla1983@gmail.com',
      username: 'sfailla'
    },
    createdAt: '2024-04-10T01:55:59.697Z',
    updatedAt: '2024-04-10T01:55:59.697Z'
  }
})
